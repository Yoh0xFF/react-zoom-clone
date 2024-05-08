export interface MessageType {
  identity: string;
  content: string;
  messageCreatedByMe: boolean;
}

export interface DirectMessageType {
  authorSocketId?: string;
  receiverSocketId?: string;
  identity: string;
  content: string;
  messageCreatedByMe?: boolean;
}
