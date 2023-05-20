import { action, makeObservable, observable } from "mobx";

export interface IVocabulary {
  id: string;
  name: string;
  created: Date;
}

export interface ITranslation {
  id?: string;
  english: string;
  japanese: string;
}

export default class VocabularyStore {
  vocabularies: IVocabulary[] = [];

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

  updateName(vocabularyId: string, name: string) {
    this.vocabularies = this.vocabularies.map((vocabulary) => {
      if (vocabulary.id !== vocabularyId) {
        return vocabulary;
      }

      return { ...vocabulary, name };
    });
  }
}
