const reflectMetadata = require('reflect-metadata');

class LoggerServiceComponentService {
  logComponentService() {
    console.log('LoggerServiceComponentService');
  }
}

class AuthService {
  id = Math.random()

  constructor() {
    console.log('CREATED', this.id)
  }

  log() {
    console.log('AuthService service', this.id);
  }
}

class AppModule {
  static providers = [AuthService]

  logAuthModule() {
    console.log('AppModule service');
  }
}

class HttpService {
  get() {
    console.log('HTTP GET request');
  }
}

function bootstrapApp(rootModule) {
  // Создание корневого инжектора (root injector)
  const rootInjector = createInjector('root');

  // Регистрация глобальных провайдеров в корневом инжекторе
  registerGlobalProviders(rootInjector);

  // Запуск модуля приложения
  const appModuleInstance = instantiateModule(rootModule, rootInjector);

  return rootInjector; // Возвращаем rootInjector
}

function createInjector(level) {
  const injector = {
    providers: new Map(),
    instances: new Map(),
    parent: null, // Корневой инжектор не имеет родителя
    level: level,
  };

  return injector;
}

// Пример регистрации провайдера в корневом инжекторе
function registerGlobalProviders(injector) {
  injector.providers.set(LoggerServiceComponentService, {useClass: LoggerServiceComponentService});
  injector.providers.set(HttpService, {useClass: HttpService});
  injector.providers.set(AuthService, {useClass: AuthService});
}

function instantiateModule(moduleClass, parentInjector) {
  // Создаём инжектор для модуля
  const moduleInjector = createInjector('module');
  moduleInjector.parent = parentInjector; // Инжектор модуля наследует зависимости от родительского

  // Регистрируем сервисы, специфичные для модуля
  registerModuleProviders(moduleInjector, moduleClass);

  // Создаём инстанс модуля
  const moduleInstance = new moduleClass();

  return moduleInstance;
}

function createComponentInstance(componentClass, parentInjector) {
  // Создаём инжектор для компонента
  const componentInjector = createInjector('component');
  componentInjector.parent = parentInjector;
  // Если компонент имеет свои провайдеры, регистрируем их
  if (componentClass.providers) {
    componentClass.providers.forEach(service => {
      componentInjector.providers.set(service, {useClass: service})
    })
  }

  // Создаём инстанс компонента, передавая ему зависимости
  const componentInstance = createInstance(componentClass, componentInjector);

  return componentInstance;
}

function registerComponentProviders(injector, componentClass) {
  // Например, у компонента есть собственный сервис
  injector.providers.set(LoggerServiceComponentService, {useClass: LoggerServiceComponentService});
  injector.providers.set(AuthService, {useClass: AuthService});
}

function registerModuleProviders(injector, moduleClass) {
  if (moduleClass === AppModule) {
    // injector.providers.set(LoggerServiceComponentService, {useClass: LoggerServiceComponentService});
    // injector.providers.set(AuthService, {useClass: AuthService});
  }
}


function resolveDependency(injector, token) {
  // Если инстанс уже создан, возвращаем его
  if (injector.instances.has(token)) {
    return injector.instances.get(token);
  }

  // Если провайдер зарегистрирован в текущем инжекторе
  if (injector.providers.has(token)) {
    const provider = injector.providers.get(token);
    const instance = createInstance(provider.useClass, injector);
    injector.instances.set(token, instance); // Сохраняем инстанс
    return instance;
  }

  // Если провайдера нет, запрашиваем у родительского инжектора
  if (injector.parent) {
    return resolveDependency(injector.parent, token);
  }

  // Если зависимость не найдена
  throw new Error(`No provider for ${token}`);
}

// Явно определяем зависимости для классов вместо использования Reflect
function createInstance(ClassType, injector) {
  // Здесь мы явно задаем зависимости для наглядности
  const dependencies = ClassType.providers || [];

  let resolvedDependencies = []
  if (dependencies.length > 0) {
    resolvedDependencies = dependencies.map(dep => resolveDependency(injector, dep));

  } else {
    // Если провайдеров нет, ищем зависимости для ClassType через корневой инжектор
    const rootInjector = getRootInjector(injector);
    const injectedDependencies = getInjectedDependencies(ClassType); // Найдем зависимости, которые класс инжектирует
    resolvedDependencies = injectedDependencies.map(dep => resolveDependency(rootInjector, dep));
  }
  // Создаём инстанс класса с разрешёнными зависимостями
  return new ClassType(...resolvedDependencies);
}

function getInjectedDependencies(ClassType) {
  // Здесь мы можем симулировать метаданные зависимостей конструктора
  // В реальном Angular это использовалось бы через Reflect.getMetadata
  return ClassType.dependencies || [];
}

function getRootInjector(injector) {

  // Идём по цепочке инжекторов, пока не найдём корневой
  let currentInjector = injector;
  while (currentInjector.parent) {
    currentInjector = currentInjector.parent;
  }
  return currentInjector; // Возвращаем корневой инжектор
}

// Объявляем компонент, который требует инъекции LoggerServiceComponentService
class MyComponent {
  static providers = []
  static dependencies = [AuthService]

  constructor(public authService: AuthService) {
  }

  execute() {
    this.authService.log();
  }

  auth() {
    this.authService.log()
  }
}

class FooterComponent {
  static providers = [AuthService]
  static dependencies = [AuthService]

  constructor(public authService: AuthService) {
  }

  execute() {
    this.authService.log();
  }

  auth() {
    this.authService.log()
  }
}

// Запускаем приложение с AppModule
const rootInjector = bootstrapApp(AppModule);
// Создаём инстанс компонента и вызываем метод
const componentInstance = createComponentInstance(MyComponent, rootInjector);
const footerComponent = createComponentInstance(FooterComponent, rootInjector);
console.log(componentInstance)
componentInstance.auth(); // Должен вывести "LoggerServiceComponentService"
footerComponent.auth()
