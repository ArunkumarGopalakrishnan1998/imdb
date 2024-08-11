export interface TitleCredit {
    "adult": boolean,
    "gender": number,
    "character": string,
    "id": number,
    "known_for_department": string,
    "name": string,
    "original_name": string,
    "popularity": number,
    "profile_path": null,
    "credit_id": string,
    "department": string,
    "job": string
}
export interface TitleCreditsIntefrace {
    id: number,
    cast: TitleCredit[],
    crew: TitleCredit[]
} 