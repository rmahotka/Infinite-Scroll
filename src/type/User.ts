/** Represents a compact version of a user, with only essential details. */
export interface IUserCompact {
    id: number;
    name: string;
    email?: string;
    picture?: string;
}
