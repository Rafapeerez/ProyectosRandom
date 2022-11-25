import random

class Wordle:
    
    def __init__(self):
        self.diccionario=['LABIOS']
        self.cont = 0
        self.palabra=self.juega()
        

    def juega(self):
        random.shuffle(self.diccionario)
        return self.diccionario[0]

    
    def compara_palabras(self, cadena1, cadena2):
        respuesta=''
        for i in range(len(cadena1)):
            if(cadena1[i]==cadena2[i]):
                respuesta=respuesta+'+'
            else:
                if(self.compara_palabras2(cadena1,cadena2,i)) is True:
                    respuesta=respuesta+'*'
                else:
                    respuesta=respuesta+'-'
        self.cont=self.cont+1
        if(self.comprobar_contador()) is True:
            return False
        return respuesta

    def compara_palabras2(self, cadena1, cadena2,i):
        respuesta=''
        letra = ''
        for j in range(len(cadena1)): 
            if(cadena1[j] == cadena2[i]):
                return True
                  
        return False
        
    def comprobar_contador(self):
        if(self.cont>6):
            return True
        return False


    def cuenta_letras(self, cadena):
        if((len(cadena) == 6)):
            return True
        
        return False
