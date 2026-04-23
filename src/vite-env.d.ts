/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_KEY?: string;
  /** Instagram username for store (with or without @). Set in env to show link in footer & contact. */
  readonly VITE_STORE_INSTAGRAM_HANDLE?: string;
}
