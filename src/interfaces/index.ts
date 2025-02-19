export interface IPokemonList {
  count: number;
  next: string;
  previous: string;
  results: IPokemonListSingle[];
}

export interface IPokemonGeneration {
  pokemon_species: IPokemonListSingle[];
}

export interface IPokemonListSingle {
  name: string;
  url: string;
}

export interface ISprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface IPokemonDetailsSingle {
  sprites: ISprites;
  abilities: IAbility[];
  cries: {
    latest: string;
    legacy: string;
  };
  name: string;
  stats: IStats[];
  weight: number;
  height: number;
  types: ITypes[];
  moves: IMoves[];
}

export interface IMoves {
  move: {
    name: string;
    url: string;
  };
}

export interface IMoveDetail {
  accuracy: number;
  name: string;
  power: number;
  pp: number;
  priority: number;

  contest_type: {
    name: string;
  };
  damage_class: {
    name: string;
  };

  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}

export interface IPokemonTypeSingle {
  sprites: {
    "generation-viii": {
      "sword-shield": {
        name_icon: string;
      };
    };
  };
}

export interface IAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface IStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface ITypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
