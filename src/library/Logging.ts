import chalk from 'chalk'

//CUSTOM LOGGING
export default class Logging {
  public static log = (args: any) => this.info(args)

  //Nastavi blue log text za string-e (info stringi)
  public static info = (args: any) =>
    console.log(
      chalk.blue(`[${new Date().toLocaleString()}] [INFO]`, typeof args === 'string' ? chalk.blueBright(args) : args),
    )

  //Nastavi yellow log text za warning stringe
  public static warn = (args: any) =>
    console.log(
      chalk.yellow(`[${new Date().toLocaleString()}] [INFO]`),
      typeof args === 'string' ? chalk.yellowBright(args) : args,
    )

  //Nastavi red log text za error stringe
  public static error = (args: any) =>
    console.log(
      chalk.red(`[${new Date().toLocaleString()}] [INFO]`),
      typeof args === 'string' ? chalk.redBright(args) : args,
    )
}
