export default class PageControl {
    static refresh(){
        window.location.reload();
    }

    static setTitle(title){
        document.title = title;
    }

    static scrollTop(){
        window.scrollTo(0,0);
    }

}