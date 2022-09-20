export interface CursorPosition {
  left: number;
  top: number;
}

export interface SocketUser {
  client_id?: string;
  name: string;
  position: CursorPosition;
}
