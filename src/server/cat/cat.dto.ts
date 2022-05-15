export class CreateCatDTO {
  readonly _id: string;
  readonly cat_species: string;
  readonly cat_age: number;
}

export class EditCatDTO {
  readonly cat_species: string;
  readonly cat_age: number;
}
