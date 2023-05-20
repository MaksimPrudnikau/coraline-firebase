import { User } from "firebase/auth";
import {
  push,
  ref,
  remove as firebaseRemove,
  update as firebaseUpdate,
} from "firebase/database";
import { firebase } from "../../components/Databases/firestore.ts";
import { IVocabulary } from "../Mobx/VocabularyStore.ts";

export async function create(user: User | null | undefined) {
  if (!user) {
    return;
  }

  const collection = ref(firebase, `vocabularies/${user.uid}`);
  const path = await push(collection, {
    created: Date.now(),
  });

  return path.key;
}

export async function update(
  user: User | null | undefined,
  vocabulary: IVocabulary
) {
  if (!user) {
    return;
  }

  const collection = ref(firebase, `vocabularies/${user.uid}/${vocabulary.id}`);
  await firebaseUpdate(collection, { ...vocabulary, id: null });
}

export async function remove(
  user: User | null | undefined,
  vocabulary: IVocabulary
) {
  if (!user) {
    return;
  }

  const collection = ref(firebase, `vocabularies/${user.uid}/${vocabulary.id}`);
  await firebaseRemove(collection);
}
