import { User } from "firebase/auth";
import { TranslationsStore } from "../Mobx/TranslationsStore.ts";
import {
  onValue,
  push,
  ref,
  remove as firebaseRemove,
  update as firebaseUpdate,
} from "firebase/database";
import { firebase } from "../Databases/firestore.ts";
import { ITranslation } from "../Mobx/VocabularyStore.ts";

export async function create(
  user: User | null | undefined,
  vocabularyId: string,
  translation: ITranslation
) {
  if (!user) {
    return;
  }
  const collection = ref(firebase, `translations/${user.uid}/${vocabularyId}`);
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
  const collection = ref(firebase, `translations/${user.uid}/${vocabularyId}`);

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
  if (!user) {
    return;
  }
  const { id, english, japanese } = translation;

  const collection = ref(
    firebase,
    `translations/${user.uid}/${vocabularyId}/${id}`
  );

  await firebaseUpdate(collection, {
    english,
    japanese,
  });
}

export async function remove(
  user: User | null | undefined,
  vocabularyId: string,
  translation: ITranslation
) {
  if (!user) {
    return;
  }

  const path = ref(
    firebase,
    `translations/${user.uid}/${vocabularyId}/${translation.id}`
  );
  await firebaseRemove(path);
}
