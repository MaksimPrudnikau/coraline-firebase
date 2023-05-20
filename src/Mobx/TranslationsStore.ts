import { action, makeObservable, observable } from "mobx";
import { ITranslation } from "./VocabularyStore.ts";
import { cloneDeep } from "lodash";

export class TranslationsStore {
  public translations: ITranslation[] = [];
  constructor() {
    makeObservable(this, {
      translations: observable,
      set: action,
      add: action,
      update: action,
      remove: action,
    });
  }

  set(translations: ITranslation[]) {
    this.translations = cloneDeep(translations);
  }

  add(translation: ITranslation) {
    this.translations.push(translation);
  }

  update(translation: ITranslation) {
    this.translations = this.translations.map((t) =>
      t.id === translation.id ? translation : t
    );
  }

  remove(translation: ITranslation) {
    this.translations = this.translations.filter(
      (t) => t.id !== translation.id
    );
  }
}
