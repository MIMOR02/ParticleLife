let flavors = {"red": [1,100000,3,1], "blue": [0.5,1.5,2,-1],"green":[0.75,2.75,3,1],"yellow":[1,4,4,-1]};
let b = 0.5;
let universe;

class Particle{
	constructor(x, y, flavor, mass, v){
		this.x = x;
		this.y = y;
		this.flavor = flavor;
		this.mass = mass;
		this.v = v;
	}
	setX(x){
		this.x = x;
	}
	setY(y){
		this.y=y;
	}
	setFlavor(flavor){
		this.flavor=flavor;
	}
	setMass(mass){
		this.mass = mass;
	}
	setV(v){
		this.v=v;
	}
	getX(){
		return this.x;
	}
	getY(){
		return this.y;
	}
	getFlavor(){
		return this.flavor;
	}
	getMass(){
		return this.mass;
	}
	getV(){
		return this.v;
	}
	distance(x,y){
		return Math.sqrt((this.x - x)**2+(this.y-y)**2);
	}
	getForce(particle){
		let dist = this.distance(particle.x,particle.y);
		let minrad = flavors[particle.flavor][0];
		let maxrad = flavors[particle.flavor][1];
		let maxmag = flavors[particle.flavor][2];
		let sign = flavors[particle.flavor][3];
		let angle;
		let force;
		try{
			angle = Math.atan((this.y-y)/(this.x-x));
		}
		catch (error){
			angle = 1.57079632679;
		}

		if(dist<minrad){
			force = 10*(dist-minrad)**2;
		}
		else if(dist<maxrad){
			force = -1*sign*Math.abs(2*maxmag/(minrad+maxrad)*(dist-(minrad+maxrad)/2) - maxmag);
		}
		else{
			force = 0;
		}
		//console.log(force);
		return [force, angle];
	}
}

function evolve(universe,dt){
	for(let i =0;i<universe.length;i++){
		let net_magnitude = 0;
		let net_direction = 0;
		for(let j=0;j<universe.length;j++){
			if(i==j){
				net_magnitude+=0;
				net_direction+=0;
			}
			else{
				let force = universe[i].getForce(universe[j]);
				net_magnitude+=force[0];
				net_direction+=force[1];
			}
			universe[i].setX(universe[i].getX()+universe[i].getV()*Math.cos(net_direction)*dt+1/2*net_magnitude*Math.cos(net_direction)/universe[i].getMass()*(dt**2));
      universe[i].setY(universe[i].getY()+universe[i].getV()*Math.sin(net_direction)*dt+1/2*net_magnitude*Math.sin(net_direction)/universe[i].getMass()*(dt**2));
    	universe[i].setV(universe[i].getV()+net_magnitude*dt);
		}
	}
}
function render(universe){

}

function setup() {
	createCanvas(windowWidth, windowHeight);
	universe = new Array(10).fill(0).map(x=> new Particle(floor(random(windowWidth)),floor(random(windowHeight)),"red",1,0));
	console.log(universe[0].x);

}

function draw() {
	evolve(universe,10);
	console.log([universe[0].x,universe[0].y]);
}
