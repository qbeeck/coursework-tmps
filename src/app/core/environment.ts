export interface EnvironmentI {
  production: boolean;
}

/**
 * Singleton Pattern
 */
export class Environment {
  private static _instance: Environment | null = null;
  private _environment: EnvironmentI | null = null;

  private constructor() {}

  static getInstance(): Environment {
    if (!Environment._instance) {
      Environment._instance = new Environment();
    }

    return Environment._instance;
  }

  setEnvironment(environment: EnvironmentI): void {
    if (this._environment) throw Error('Environment can be setted only once');

    this._environment = environment;
  }

  get isLoggerEnabled(): boolean {
    if (!this._environment) throw Error('Not setted environment');

    return !this._environment.production;
  }
}
