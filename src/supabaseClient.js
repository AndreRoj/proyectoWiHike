import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kpdtaamfpxohcygwpzqb.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZHRhYW1mcHhvaGN5Z3dwenFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMzQzMDYsImV4cCI6MjA1NjcxMDMwNn0.wyYuEYi0Se-2XdGa2Ru0K2vbEphrQEStKW1Oyi2-JnM"

export const supabase = createClient(supabaseUrl, supabaseKey)
export const uploadImage = async (file, bucket, folder) => {
    try {
        const fileExt = file.name.split('.').pop(); // Obtiene la extensión del archivo
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`; // Genera un nombre único
        const filePath = `${folder}/${fileName}`; // Ruta completa: carpeta del usuario + nombre del archivo

        // Sube la imagen a Supabase
        const { error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) throw error;

        // Obtiene la URL pública de la imagen
        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
        return urlData.publicUrl; // Devuelve la URL pública de la imagen
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error;
    }
};
