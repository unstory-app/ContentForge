/**
 * ContentForge AI - Puter.js Utility Wrapper
 * This file provides type-safe access to Puter.js services.
 */

/**
 * ContentForge AI - Puter.js Utility Wrapper
 * This file provides type-safe access to Puter.js services.
 */

interface PuterAIResponse {
    message: {
        content: string;
        role: string;
    };
}

interface PuterUser {
    username: string;
    uid: string;
}

interface PuterFile {
    name: string;
    size: number;
    mtime: number;
    is_dir: boolean;
}

// Since Puter.js is loaded via script tag, we declare the global variable
declare global {
  interface Window {
    puter: any;
  }
}

/**
 * Access the global puter object safely.
 */
export const getPuter = () => {
    if (typeof window === 'undefined') return null;
    return window.puter;
};

// AI Services
export const puterAI = {
  /**
   * Chat with AI models (OpenAI, Claude, Gemini)
   */
  chat: async (message: string, options: { model?: string } = {}): Promise<PuterAIResponse> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.ai.chat(message, options);
  },

  /**
   * Extract text from images (OCR)
   */
  img2txt: async (image: string | Blob): Promise<string> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.ai.img2txt(image);
  },

  /**
   * Convert text to speech (TTS)
   */
  txt2speech: async (text: string, options: { voice?: string } = {}): Promise<void> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.ai.txt2speech(text, options);
  }
};

// Key-Value Storage (NoSQL)
export const puterKV = {
  set: async (key: string, value: any): Promise<void> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.kv.set(key, value);
  },
  get: async (key: string): Promise<{ value: any }> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.kv.get(key);
  },
  del: async (key: string): Promise<void> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.kv.del(key);
  },
  list: async (): Promise<{ key: string, value: any }[]> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.kv.list();
  }
};

// Cloud Storage (File System)
export const puterFS = {
  write: async (path: string, content: string | Blob): Promise<void> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.fs.write(path, content);
  },
  read: async (path: string): Promise<any> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.fs.read(path);
  },
  delete: async (path: string): Promise<void> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.fs.delete(path);
  },
  list: async (path: string = '/'): Promise<PuterFile[]> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.fs.readdir(path);
  }
};

// Authentication
export const puterAuth = {
  signIn: async (): Promise<void> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.auth.signIn();
  },
  signOut: async (): Promise<void> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.auth.signOut();
  },
  isSignedIn: async (): Promise<boolean> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.auth.isSignedIn();
  },
  getUser: async (): Promise<PuterUser> => {
    const puter = getPuter();
    if (!puter) throw new Error("Puter.js not loaded");
    return await puter.auth.getUser();
  }
};

// Networking
export const puterNet = {
    // Puter Networking (Sockets, etc.) can be added here
};
