

Angular 2: Reactive Forms - Snapshot 2
===================
En esta parte veremos estos contenidos del curso de Pluralshight:

 - Building a Reactive Form

----------
### 1 - Building a Reactive Form
----------

#### The component class 

Ya hemos comentado anteriormente cuales eran las diferencias entre Template-drive y Reactive. Esta ilustración nos ayudará un mas:

![enter image description here](https://i.imgur.com/4aTDUnz.png)

Observamos que la plantilla (en verde) en el caso de Reactive no hace yuso de two-way binding, sino que se enlaza la plantilla con los Frormgroup y FormControl definidos manualmente por nosotros en la clase.



Un FormModel esta compesto o puede estar por :

- **Root FormGroup**
- FormControl por cada uno de los elementos input
- Nested FormGroup 
- FormArrays (propio de Reactive Forms)

Una manera de crear un Root FormGroup sería:

![enter image description here](https://i.imgur.com/L01q1b2.png)

El siquiente paso seria importar el **ReactiveFormsModule** dentro del modulo donde se encuentre nuestro Reactive Form

----------
#### The Template
En plantilla enlazamos el root Form con FromGroup declarado en la clase:
![enter image description here](https://i.imgur.com/t2E0uRs.png)

Ademas cada control input tiene que ser enlazado con su correspondiente FormControl declarado en la clase. Para ello utilizamos la directiva formControlName:

![enter image description here](https://i.imgur.com/6xjh20b.png)

Desde la plantilla podemos acceder a los FormControl y FormGroup

![enter image description here](https://i.imgur.com/FnGQtOB.png)

----------
#### Using setValue & path Value

Si necestimos establecer valores a nuestros FormControls, el FormGrop nos proporciona de hacerlo:

![enter image description here](https://i.imgur.com/tEbaXMS.png)

**setValue**, se utiliza cuando tenemos que establecer todos los valores.
**pthValue** se utiliza cuado queremos establecer solamente a algunos FormControls.

----------
#### Simplifying with FormBuilder
Para simplificar la creación de FormGroup, FormControls, ...etc se utiliza el FormBueilder haciendo el codigo mucho mas limpio. La sintaxis es asi:

![enter image description here](https://i.imgur.com/xKp0NqB.png)

----------
### 2 - Práctica
----------
El objetivo es transformar  aplicando lo aprendido el formulario de edicion de producto a un ReactiveForm.



Para ello clonamos el **SnapShot 2** desde el prmercommit, ya que este commit tiene implementado ya el servicio-mock en memoria para productos:


    git clone https://github.com/tc-frontend/course_angular2_day2_snapshot2
    cd course_angular2_day2_snapshot2
    git checkout tags/init
    npm install

y hacer los pasos detallados en el historial de commits:

https://goo.gl/UGmNkf


#### 1 - Añadimos ReactiveFromModule to product module

https://goo.gl/AJCkGp

#### 2 - Actualizar a Reactive Form html & class component 
Actualizamos los componentes para que utilicen ReactiveForms tanto en el HTML como en la clase.
Para el caso particular de la lsita de tags la de momento. Lo abordaremos mas adelante.
Las partes no necesarias se comentan o se borran (ya as incluiremos mas adelante)

https://goo.gl/sO6WQY

#### 3 - Correjir el metodo Save utilizando Object.assign
Al no tener two-way binding somos los responsables de mantener actulizado el objeto producto.

https://goo.gl/8Bpnme

#### 4 - Actualizar a FormBuilder class component 
Implementamos FormBuilder para simplificar el código

https://goo.gl/PmCD9C

#### 5 - Añadimos nuevos componeter
Vamos a añadir estos componentes para utilizarlos en en el siguiente práctica:

![enter image description here](https://i.imgur.com/r1vdYzh.png)

- Input para confirmar el codigo de producto (solo disponible para la creación de un nuevo componente)

![enter image description here](https://i.imgur.com/IrJgJPL.png)
- Select para indicar la disponibilidad (Available, Less than 2 weeks, More than 2 weeks, Out of stoc)
- Input para indicar la cantidad de productos (solo siempre y cuando no se selecccion 'Out of stock')
- Select para selecionar el motivo si el producot esta fuera de stock (solo se mostrara selecionado 'Out of stock')

https://goo.gl/XQoOW5

----------

Si queremos ver la App en nuestro browser

    npm start

Si queremos ver la solucion final de este SnapShot:

    git checkout master
    npm install
    npm start





