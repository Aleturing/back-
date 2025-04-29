const bcrypt = require('bcrypt');
const db = require('./db'); // Asegúrate de que la ruta sea correcta

const crearUsuarioDemo = async () => {
    const nombre = 'demo';
    const correo = 'demo@demo.com';
    const contraseña = 'demo';

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);

        db.run(`INSERT INTO usuario (nombre, correo, contraseña) VALUES (?, ?, ?)`,
            [nombre, correo, hashedPassword],
            function (err) {
                if (err) {
                    console.error('Error al crear el usuario demo:', err.message);
                } else {
                    console.log('Usuario demo creado exitosamente.');
                }
            });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
    }
};

crearUsuarioDemo();
