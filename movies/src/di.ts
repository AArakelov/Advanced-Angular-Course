class LoggerService {
  log(msg: string) {
    console.log(`LoggerService: ${msg}`)
  }
}


class UserService {
  id = Math.random()

  constructor(private logger: LoggerService) {
  }

  getUser() {
    this.logger.log('Fetching user');
    return {name: "Arakelov"}
  }
}


class Injector {
  private providers = new Map();
  private instances = new Map();


  register(token, provider) {
    this.providers.set(token, provider)
  }

  get(token) {
    if (this.instances.has(token)) {
      return this.instances.get(token)
    }


    if (this.providers.has(token)) {
      const provider = this.providers.get(token);
      const instance = this.createInstance(provider);
      this.instances.set(token, instance);
      return instance;
    }
    throw new Error(`No provider for token: ${token}`)
  }

  private createInstance(provider) {
    const {useClass, deps = []} = provider

    const dependencies = deps.map(dep => this.get(dep));
    return new useClass(...dependencies);
  }
}


const injector = new Injector();


injector.register(LoggerService, {useClass: LoggerService})
injector.register(UserService, {useClass: UserService, deps: [LoggerService]})

const userService = injector.get(UserService);


console.log(userService.id);
