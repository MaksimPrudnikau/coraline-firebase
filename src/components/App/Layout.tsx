import { FC, ReactNode, useState } from "react";
import { Button, Container, Navbar, Offcanvas, Toast } from "react-bootstrap";
import { observer } from "mobx-react";
import { useStores } from "../../lib/Mobx";
import { firebaseAuth } from "../../lib/Databases/firestore.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "./const.ts";
import * as VocabularyService from "../../lib/Services/Vocabulary.ts";
import { IVocabulary } from "../../lib/Mobx/VocabularyStore.ts";
import { FiEdit, FiLogOut, FiMenu } from "react-icons/fi";
import { layoutContext } from "./context.ts";
import { signOut } from "firebase/auth";

interface IProps {
  children: ReactNode;
}

const _Layout: FC<IProps> = ({ children }) => {
  const [user] = useAuthState(firebaseAuth);
  const { vocabularyStore } = useStores();
  const vocabularies = vocabularyStore.vocabularies;
  const [showMenu, setShowMenu] = useState(false);
  const navigator = useNavigate();
  const location = useLocation();
  const [selectedVocabulary, selectVocabulary] = useState<IVocabulary>();

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);
  const onCreate = async () => {
    const vocabularyId = await VocabularyService.create(user);
    if (!vocabularyId) {
      return;
    }

    navigator(`${ROUTES.VOCABULARY}/${vocabularyId}`);
  };
  const onClose = async (vocabulary: IVocabulary) => {
    await VocabularyService.remove(user, vocabulary);
    if (vocabularies.length === 1) {
      vocabularyStore.remove(vocabulary);
    }

    if (location.pathname.includes(ROUTES.VOCABULARY)) {
      navigator(ROUTES.HOME);
    }
  };

  const onEdit = (vocabulary: IVocabulary) => {
    closeMenu();
    navigator(`${ROUTES.VOCABULARY}/${vocabulary.id}`);
  };

  const isSelected = (v: IVocabulary) => selectedVocabulary?.id === v.id;
  const selectedStyle = (v: IVocabulary) =>
    isSelected(v)
      ? {
          border: "2px solid blue",
        }
      : {};

  return (
    <layoutContext.Provider
      value={{
        vocabulary: selectedVocabulary,
        openMenu,
      }}
    >
      <Container>
        <Navbar bg="light" expand="lg">
          <Container>
            <Button
              variant="outline-secondary"
              onClick={openMenu}
              style={{ display: "flex" }}
            >
              <FiMenu size={20} />
            </Button>
            <Navbar.Brand href={ROUTES.HOME}>Coraline</Navbar.Brand>
            <Button
              variant="outline-secondary"
              onClick={() => signOut(firebaseAuth)}
              style={{ display: "flex" }}
            >
              <FiLogOut size={20} />
            </Button>
          </Container>
        </Navbar>
        {children}
        <Offcanvas show={showMenu} onHide={closeMenu}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Vocabularies</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {vocabularies.map((vocabulary) => {
              const createdDate = new Date(vocabulary.created);
              return (
                <Toast
                  key={vocabulary.id}
                  onClose={() => onClose(vocabulary)}
                  style={{ marginBottom: 7, ...selectedStyle(vocabulary) }}
                >
                  <Toast.Header>
                    <a
                      onClick={() => onEdit(vocabulary)}
                      style={{ marginRight: "10px", cursor: "pointer" }}
                    >
                      <FiEdit size={20} color={"rgba(30, 139, 195)"} />
                    </a>
                    <strong className="me-auto">{vocabulary.name}</strong>
                    <small>Created {createdDate.toLocaleDateString()}</small>
                  </Toast.Header>
                  <Toast.Body onClick={() => selectVocabulary(vocabulary)}>
                    {vocabulary.hint}
                  </Toast.Body>
                </Toast>
              );
            })}
          </Offcanvas.Body>
          <Button onClick={onCreate}>Create new</Button>
        </Offcanvas>
      </Container>
    </layoutContext.Provider>
  );
};

export const Layout = observer(_Layout);
