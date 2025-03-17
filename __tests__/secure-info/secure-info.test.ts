import { configSign, configEncrypt, createSecureFunctions } from "../../src";
import crypto from "crypto";

interface CardSensitiveData {
  cardNumber: string;
  expirationDate: string;
  // signature: string
}

interface Card {
  id: string;
  lastFour: string;
  cardHolder: string;
  sensitiveData: CardSensitiveData;
  // sensitiveData: string
}

interface SignedCardSensitiveData extends CardSensitiveData {
  signature: string;
}

interface SignedCard extends Omit<Card, "sensitiveData"> {
  sensitiveData: SignedCardSensitiveData;
}

describe("secure functions", () => {
  beforeAll(() => {
    configEncrypt({
      iv: crypto.randomBytes(16).toString("hex"),
      key: crypto.randomBytes(32).toString("hex"),
    });
    configSign({
      secret: "mySecret",
    });
  });

  describe("secure functions with default signature key", () => {
    let sensitiveCard1: CardSensitiveData;
    let sensitiveCard2: CardSensitiveData;
    let card1: Card;
    let card2: Card;

    const { recoverySecureInfo, securizeInfo } = createSecureFunctions<
      Card,
      "sensitiveData"
    >("sensitiveData", ["cardNumber", "expirationDate"]);

    beforeAll(() => {
      sensitiveCard1 = {
        cardNumber: "5678901234564321",
        expirationDate: "05/28",
      };
      card1 = {
        id: "1",
        lastFour: "1234",
        cardHolder: "John Doe",
        sensitiveData: sensitiveCard1,
      };
      sensitiveCard2 = {
        cardNumber: "1234567890123456",
        expirationDate: "01/24",
      };
      card2 = {
        id: "2",
        lastFour: "4321",
        cardHolder: "Jane Doe",
        sensitiveData: sensitiveCard2,
      };
    });

    it("should encrypt and decrypt sensitive data", () => {
      const secureCard = securizeInfo(card1);
      expect(secureCard.sensitiveData).toEqual(expect.any(String));
      expect(secureCard.sensitiveData).not.toEqual("");
      const card = recoverySecureInfo(secureCard);
      expect(card).toEqual(card1);
      expect(card).not.toEqual(card2);
    });

    it("should encrypt and decrypt sensitive data with a custom signature key", () => {
      const secureCard1 = securizeInfo(card1, card1.id);
      const secureCard2 = securizeInfo(card2, card2.id);
      const invalidSecureCard = {
        ...secureCard1,
        sensitiveData: secureCard2.sensitiveData,
      };
      expect(() => recoverySecureInfo(invalidSecureCard, card1.id)).toThrow();
      expect(() => recoverySecureInfo(secureCard1)).toThrow();
      expect(() => recoverySecureInfo(secureCard1, card1.id)).not.toThrow();
      expect(recoverySecureInfo(secureCard1, card1.id)).toEqual(card1);
    });
  });

  describe("secure functions with custom signature key", () => {
    let sensitiveCard1: SignedCardSensitiveData;
    let sensitiveCard2: SignedCardSensitiveData;
    let card1: SignedCard;
    let card2: SignedCard;

    const { recoverySecureInfo, securizeInfo } = createSecureFunctions<
      SignedCard,
      "sensitiveData",
      "customSignature"
    >("sensitiveData", ["cardNumber", "expirationDate"], "customSignature");

    beforeAll(() => {
      sensitiveCard1 = {
        cardNumber: "5678901234564321",
        expirationDate: "05/28",
        signature: "asdfasdfa",
      };
      card1 = {
        id: "1",
        lastFour: "1234",
        cardHolder: "John Doe",
        sensitiveData: sensitiveCard1,
      };
      sensitiveCard2 = {
        cardNumber: "1234567890123456",
        expirationDate: "01/24",
        signature: "qwerreweq",
      };
      card2 = {
        id: "2",
        lastFour: "4321",
        cardHolder: "Jane Doe",
        sensitiveData: sensitiveCard2,
      };
    });

    it("should encrypt and decrypt sensitive data", () => {
      const secureCard = securizeInfo(card1);
      expect(secureCard.sensitiveData).toEqual(expect.any(String));
      expect(secureCard.sensitiveData).not.toEqual("");
      const card = recoverySecureInfo(secureCard);
      expect(card).toEqual(card1);
      expect(card).not.toEqual(card2);
    });

    it("should encrypt and decrypt sensitive data with a custom signature key", () => {
      const secureCard1 = securizeInfo(card1, card1.id);
      const secureCard2 = securizeInfo(card2, card2.id);
      expect(secureCard1.sensitiveData).not.toEqual(secureCard2);
      const invalidSecureCard = {
        ...secureCard1,
        sensitiveData: secureCard2.sensitiveData,
      };
      expect(() => recoverySecureInfo(invalidSecureCard)).toThrow();
    });
  });

  describe("secure functions with distinct signature keys", () => {
    let sensitiveCard: CardSensitiveData;
    let card: Card;

    const {
      recoverySecureInfo: recoverySecureInfoWithDefaultSignature,
      securizeInfo: securizeInfoWithDefaultSignature,
    } = createSecureFunctions<Card, "sensitiveData">("sensitiveData", [
      "cardNumber",
      "expirationDate",
    ]);

    const {
      recoverySecureInfo: recoverySecureInfoWithCustomSignature,
      securizeInfo: securizeInfoWithCustomSignature,
    } = createSecureFunctions<Card, "sensitiveData", "customSignature">(
      "sensitiveData",
      ["cardNumber", "expirationDate"],
      "customSignature"
    );

    beforeAll(() => {
      sensitiveCard = {
        cardNumber: "5678901234564321",
        expirationDate: "05/28",
      };
      card = {
        id: "1",
        lastFour: "1234",
        cardHolder: "John Doe",
        sensitiveData: sensitiveCard,
      };
    });

    it("should encrypt sensitive data with distinct functions create distincts sensitiveData values", () => {
      const secureCardWithDefaultSignature =
        securizeInfoWithDefaultSignature(card);
      const secureCardWithCustomSignature =
        securizeInfoWithCustomSignature(card);

      expect(secureCardWithDefaultSignature.sensitiveData).not.toEqual(
        secureCardWithCustomSignature.sensitiveData
      );

      expect(
        recoverySecureInfoWithCustomSignature(secureCardWithCustomSignature)
          .sensitiveData
      ).toEqual(
        recoverySecureInfoWithDefaultSignature(secureCardWithDefaultSignature)
          .sensitiveData
      );
    });
  });
});
