export class StyleHelper {
    public static combinedSty(...arg: string[]) {
      return arg.filter(a => !!a).join(' ');
    }
  }
  