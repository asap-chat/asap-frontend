export enum SocialType {
  LINE = 'LINE',
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
}
export interface SocialLinks {
  facebook: string
  instagram: string
  line: string
}
export interface CreateLineInfo {
  shopName: string
  socialData: {
    channelSecret: string
    channelAccessToken: string
  }
  socialType: SocialType.LINE
  ownerId: string
}
