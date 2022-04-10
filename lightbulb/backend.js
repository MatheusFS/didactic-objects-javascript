const lightbulb = {

    state: false,

    turn_on: function(){

        this.state = true;
        render();
    },
    turn_off: function(){
        
        this.state = false;
        render();
    },

    get_state: function(){
        
        return this.state;
    },

    toggle: function(){
        
        return this.get_state() ? this.turn_off() : this.turn_on()
    },
}