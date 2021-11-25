class Usuario {

    constructor(nombre,apellido,libros,mascotas){

        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;

    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota){
        this.mascotas.push(mascota)
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombre,autor){
        this.libros.push({nombre:nombre,autor:autor});
    }

    getBookNames(){
        return this.libros.map( e => e.nombre );
    }

}

const usuario =  new Usuario('Lucas','Gonzalez',[],[])

console.log( `Nombre y apellido: ${usuario.getFullName()}` );

usuario.addMascota('Perro')
usuario.addMascota('Gato')
usuario.addMascota('Tortuga')
usuario.addMascota('Pez')

console.log( `Cantidad de mascotas: ${usuario.countMascotas()}` );

usuario.addBook('Libro 1','William Shakespeare')
usuario.addBook('Libro 2','Charles Dickens')
usuario.addBook('Libro 3','George Orwell')
usuario.addBook('Libro 4','Gabriel García Márquez')
usuario.addBook('Libro 5','Ernest Hemmingway')

console.log( `Nombres de libros: ${usuario.getBookNames()}` );