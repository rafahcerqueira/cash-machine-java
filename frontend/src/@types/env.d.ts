/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_ENV: string;
  readonly UNDER_CONSTRUCTION: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
