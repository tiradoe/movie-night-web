export enum InviteStatusEnum {
    PENDING = "pending",
    ACCEPTED = "accepted",
    DECLINED = "declined",
    NOT_FOUND = "not_found",
    FAILED = "failed",
}

export type InviteStatus = {
    message: string
    status: InviteStatusEnum
}

