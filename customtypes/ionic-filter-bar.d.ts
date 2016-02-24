interface IonicFilterBarShowOptions {
  update?: (items: any[], query: string) => void;
}

interface IonicFilterBar {
  show(options: IonicFilterBarShowOptions): () => void;
}
