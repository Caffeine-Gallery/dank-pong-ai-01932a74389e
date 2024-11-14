import Text "mo:base/Text";

import Debug "mo:base/Debug";

actor PongGame {
    public func getGameStatus() : async Text {
        return "Game is running!";
    }
}
