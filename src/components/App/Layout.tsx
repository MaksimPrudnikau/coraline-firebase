import { FC, ReactNode, useState } from "react";
import { Button, Container, Navbar, Offcanvas, Toast } from "react-bootstrap";
import { observer } from "mobx-react";
import { useStores } from "../../lib/Mobx";
import { firebaseAuth } from "../Databases/firestore.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "./const.ts";
import * as VocabularyService from "../../lib/Services/Vocabulary.ts";
import { IVocabulary } from "../../lib/Mobx/VocabularyStore.ts";

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

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Coraline</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Navbar.Text>
            <Button onClick={openMenu}>Hello</Button>
          </Navbar.Text>
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
              <Toast key={vocabulary.id} onClose={() => onClose(vocabulary)}>
                <Toast.Header>
                  <strong className="me-auto">{vocabulary.name}</strong>
                  <small>Created {createdDate.toLocaleDateString()}</small>
                </Toast.Header>
                <Toast.Body>{vocabulary.hint}</Toast.Body>
              </Toast>
            );
          })}
        </Offcanvas.Body>
        <Button onClick={onCreate}>Create new</Button>
      </Offcanvas>
    </Container>
  );
};

export const Layout = observer(_Layout);
