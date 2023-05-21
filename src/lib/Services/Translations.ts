import { User } from "firebase/auth";
import { TranslationsStore } from "../Mobx/TranslationsStore.ts";
import {
  child,
  onValue,
  push,
  ref,
  remove as firebaseRemove,
  update as firebaseUpdate,
} from "firebase/database";
import { firebase } from "../Databases/firestore.ts";
import { ITranslation } from "../Mobx/VocabularyStore.ts";

function getCollection(user: User, vocabulary: string) {
  return ref(firebase, `${user.uid}/translations/${vocabulary}`);
}

export async function create(
  user: User | null | undefined,
  vocabularyId: string,
  translation: ITranslation
) {
  if (!user) {
    return;
  }
  const collection = getCollection(user, vocabularyId);
  await push(collection, translation);
}

export function get(
  user: User | null | undefined,
  vocabularyId: string,
  translationsStore: TranslationsStore
) {
  if (!user) {
    return;
  }

  const collection = getCollection(user, vocabularyId);

  onValue(collection, (snapshot) => {
    if (!snapshot.exists()) {
      return;
    }

    const value = snapshot.val();
    const translations = Object.entries<ITranslation>(value).map(([id, t]) => {
      t.id = id;
      return t;
    });

    translationsStore.set(translations);
  });
}

export async function update(
  user: User | null | undefined,
  vocabularyId: string,
  translation: ITranslation
) {
  if (!user || !translation.id) {
    return;
  }
  const { id, english, japanese } = translation;

  const collection = getCollection(user, vocabularyId);
  const translationRef = child(collection, id);

  await firebaseUpdate(translationRef, {
    english,
    japanese,
  });
}

export async function remove(
  user: User | null | undefined,
  vocabularyId: string,
  translation: ITranslation
) {
  if (!user || !translation.id) {
    return;
  }

  const collection = getCollection(user, vocabularyId);
  const translationRef = child(collection, translation.id);
  await firebaseRemove(translationRef);
}
