export class SleepHelper {
  public static async awaitTimeout(ms: number) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(1);
      }, ms);
    });
  }

  public static async refresh<T>(props: {
    maxQueryCount: number;
    queryInterval: number;
    queryFun: () => Promise<T>;
    breakFun: (res: T) => boolean;
  }): Promise<T | null> {
    const { maxQueryCount, queryInterval, breakFun, queryFun } = props;

    let res = null;

    try {
      for (let index = 0; index < maxQueryCount; index++) {
        res = await queryFun();
        await SleepHelper.awaitTimeout(queryInterval);
        if (breakFun(res)) {
          break;
        }
      }
    } catch (error) {
      console.info('error:', error);
    }

    return res;
  }
}
