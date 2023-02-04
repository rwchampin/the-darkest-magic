export default const useLogger = () => {

  const log = (str:string) => {
    if (navigator.userAgentData.toLowerCase().indexOf('chrome') > -1) {
      const args = [
        `%c ${str} %c`,
        `color: #fff; background: #47c; padding:3px 0;`,
      ];
      console.log.apply(console, args);
    } else if (window.console) {
      console.log(`${this.message} ${this.url}`);
    }
  }
}