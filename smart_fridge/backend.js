const items = [

    { id: 1, label: 'Banana nanica', icon: 'banana_nanica.png', },
    { id: 2, label: 'Morango', icon: 'morango.png', },
    { id: 3, label: 'Abacate', icon: 'abacate.png', },
    { id: 4, label: 'Mamão Papaya', icon: 'mamao.webp', },
];

const fridge = {

    // A lista de compras é o resultado da lista de itens esperados filtrando
    // aqueles que não se incluem em quantidade na lista de itens atuais (aqueles que já têm)

    expected_items: [],

    current_items: [],

    expect_item: (id, quantity) => fridge.add_item('expected_items', id, quantity),

    buy_item: id => fridge.add_item('current_items', id),

    add_item: (type, id, quantity = 1) => {

        const item = fridge[type].find(item => item.id === id);

        if(item) item.quantity += quantity;
        else fridge[type].push({ id, quantity });

        localStorage.setItem(`fridge_${type}`, JSON.stringify(fridge[type]));

        render();
    },

    disexpect_item: id => fridge.remove_item('expected_items', id),

    use_item: id => fridge.remove_item('current_items', id),

    remove_item: (type, id) => {

        const item = fridge[type].find(item => item.id === id);

        if(item.quantity > 1) item.quantity -= 1;
        else fridge[type] = fridge[type].filter(item => item.id !== id);

        render();
    },

    get_shopping_list: () => {

        const shopping_list = [];

        fridge.expected_items.forEach(expected_item => {

            let diff_item = false;

            const item = fridge.current_items.find(item => item.id === expected_item.id);

            if(item){

                const quantity = expected_item.quantity - item.quantity;

                if(quantity > 0) diff_item = { id: expected_item.id, quantity };
            }
            else{

                diff_item = { id: expected_item.id, quantity: expected_item.quantity };
            };

            if(diff_item) shopping_list.push(diff_item);
        });

        return shopping_list;
    },
};