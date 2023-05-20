import { action, makeObservable, observable } from "mobx";
import { cloneDeep } from "lodash";

export interface IVocabulary {
  id: string;
  name: string;
  created: Date;
  hint: string;
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
      update: action,
      remove: action,
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
    const vocabulary = this.vocabularies.find(
      (vocabulary) => vocabulary.id === id
    );
    return cloneDeep(vocabulary);
  }

  update(vocabulary: IVocabulary) {
    this.vocabularies = this.vocabularies.map((v) =>
      v.id === vocabulary.id ? vocabulary : v
    );
  }

  remove(vocabulary: IVocabulary) {
    this.vocabularies = this.vocabularies.filter((v) => v.id !== vocabulary.id);
  }
}
