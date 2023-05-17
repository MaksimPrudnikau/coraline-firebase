import { action, makeObservable, observable } from "mobx";
import { onValue, ref } from "firebase/database";
import { firebase } from "../components/Databases/firestore.ts";
import { User } from "firebase/auth";

export interface IVocabulary {
  id: string;
  name: string;
  created: Date;
}

export interface ITranslation {
  id: string;
  english: string;
  japanese: string;
}

export default class VocabularyStore {
  vocabularies: IVocabulary[] = [];
  translations: ITranslation[] = [];

  constructor() {
    makeObservable(this, {
      vocabularies: observable,
      from: action,
      add: action,
      getById: action,
      updateName: action,
    });
  }

  from(vocabularies: IVocabulary[]) {
    this.vocabularies = [...vocabularies];
  }

  add(vocabulary: IVocabulary) {
    this.vocabularies.forEach((v) => v.id);
    this.vocabularies.push(vocabulary);
  }

  getById(id: string) {
    return this.vocabularies.find((vocabulary) => vocabulary.id === id);
  }

  getTranslations(user: User, vocabulary: IVocabulary) {
    this.translations = [];
    const collection = ref(
      firebase,
      `translations/${user.uid}/${vocabulary.id}`
    );

    return onValue(collection, (snapshot) => {
      if (!snapshot.exists()) return;

      this.translations = [...snapshot.val()];
    });
  }

  updateName(vocabularyId: string, name: string) {
    this.vocabularies = this.vocabularies.map((vocabulary) => {
      if (vocabulary.id !== vocabularyId) {
        return vocabulary;
      }

      return { ...vocabulary, name };
    });
  }
}
