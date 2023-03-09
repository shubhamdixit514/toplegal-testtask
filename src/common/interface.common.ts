export interface ILocationOrigin {
    name: string;
    url: string
}

export interface IRMCharacter {
    id:	number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender:	string;
    origin:	ILocationOrigin;
    location: ILocationOrigin;
    image: string;
    episode: string[];
    url: string;
    created: string;
    __typename: string
}