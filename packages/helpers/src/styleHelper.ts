export class StyleHelper {
  public static combinedSty(...arg: any[]) {
    return arg.filter(a => typeof a === 'string').join(' ');
  }
}
