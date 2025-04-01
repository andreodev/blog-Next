export function slugify(str: string) {
  return str
    .toLowerCase() // Converte para minúsculas
    .normalize("NFD") // Remove acentos
    .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/[^a-z0-9-]/g, "") // Remove caracteres especiais
    .replace(/-+/g, "-") // Remove hífens duplicados
    .trim(); // Remove espaços extras
}