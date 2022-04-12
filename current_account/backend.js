const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const current_account = {

    balance: 0.00,
    password: '0000',
    statement: [],

    deposit: function(amount){

        amount = Number(amount);

        this.balance += amount;

        this.add_operation('deposit', amount);
    },

    withdraw: function(amount){

        amount = Number(amount);
        
        this.balance -= amount;

        this.add_operation('withdraw', amount);
    },

    get_balance: function(formated = false){
        
        return formated
        ? formatter.format(this.balance)
        : this.balance;
    },

    add_operation: function(type, amount){

        const operation = {
            type,
            amount,
            balance: this.get_balance(),
            created_at: new Date(),
        };

        this.statement.push(operation);
    },

    get_statement: function(){

        return this.statement;
    },
};