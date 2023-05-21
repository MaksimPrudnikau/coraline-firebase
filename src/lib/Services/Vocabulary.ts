import { User } from "firebase/auth";
import {
  child,
  onValue,
  push,
  ref,
  remove as firebaseRemove,
  update as firebaseUpdate,
} from "firebase/database";
import VocabularyStore, { IVocabulary } from "../Mobx/VocabularyStore.ts";
import { firebase } from "../Databases/firestore.ts";

function getCollection(user: User) {
  return ref(firebase, `${user.uid}/vocabularies`);
}

export async function create(user: User | null | undefined) {
  if (!user) {
    return;
  }

  const collection = getCollection(user);
  const path = await push(collection, {
    created: Date.now(),
  });

  return path.key;
}

export function get(
  user: User | null | undefined,
  vocabularyStore: VocabularyStore
) {
  if (!user) {
    return;
  }

  const collection = getCollection(user);

  return onValue(collection, (snapshot) => {
    if (snapshot.exists()) {
      const data: IVocabulary[] = Object.entries<IVocabulary>(
        snapshot.val()
      ).map(([id, { name, created, hint }]) => ({
        id,
        name,
        created: new Date(created),
        hint,
      }));
      vocabularyStore.from(data);
    }
  });
}

export async function update(
  user: User | null | undefined,
  vocabulary: IVocabulary
) {
  if (!user) {
    return;
  }

  const collection = getCollection(user);
  const vocabularyRef = child(collection, vocabulary.id);
  await firebaseUpdate(vocabularyRef, { ...vocabulary, id: null });
}

export async function remove(
  user: User | null | undefined,
  vocabulary: IVocabulary
) {
  if (!user) {
    return;
  }

  const collection = getCollection(user);
  const vocabularyRef = child(collection, vocabulary.id);
  await firebaseRemove(vocabularyRef);
}
