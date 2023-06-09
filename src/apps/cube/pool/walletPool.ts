export interface WalletPoolInterface {
  wallets: Array<any>;
  addWallet(arg: any): any;
}
export class WalletPool implements WalletPoolInterface {
  wallets: Array<any>;
  constructor(wallets: Array<any>) {
    this.wallets = [];
  }
  addWallet(wallet: any) {
    const serializedWallet = {
      publicKey: wallet?.publicKey,
      privateKey: wallet?.privateKey,
      balance: wallet?.balance,
      secret: wallet?.secret,
    };
    this.wallets.push(serializedWallet);
  }
  getWalletByPrivateKey(privateKey: string) {
    return this.wallets.find((wallet) => wallet.privateKey === privateKey);
  }
  getWalletByPublicKey(publicKey: string) {
    return this.wallets.find((wallet) => wallet.publicKey === publicKey);
  }
}
