interface IDeckOptions{
     numberOfSets: number;
}

class card {
    group: string;
    value: string|number;
    
    constructor(group: string, value: string|number){
        this.group = group;
        this.value = value;
    }
}