import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/notes.service';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  note:any = { id: null, title: null, description: null }
  id = null;
  show=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public notesService: NotesService) {
   this.id = navParams.get('id');
   if(this.id != 0){
    notesService.getNote(this.id).valueChanges()
    .subscribe(note =>{
      this.note = note;
    });
   }
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  addNote(){
          if(this.id != 0){
            //estamos editando
            this.notesService.editNote(this.note);
            alert('Nota modificada con exito!');

          }else{
            this.note.id = Date.now();
            this.notesService.createNote(this.note);
            alert('Nota creada con exito!');

          }
          this.navCtrl.pop();
      }

  deleteNote(){
    this.show = false;
    this.notesService.deleteNote(this.note);
    alert('Nota eliminada con exito!');
    this.navCtrl.pop();
  }

}
