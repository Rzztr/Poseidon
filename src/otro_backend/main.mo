import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";

actor DataLogger {
  type DataEntry = {
    id: Nat32;
    presionBarometrica: Text;
    temperatura: Text;
    humedad: Text;
  };

  type entryID = Nat32;
  stable var entryID: entryID = 0;

  let listaDatos = HashMap.HashMap<Text, DataEntry>(0, Text.equal, Text.hash);

  private func generaEntryID() : Nat32 {
    entryID += 1;
    return entryID;
  };
  
  public query ({caller}) func whoami() : async Principal {
    return caller;
  };

  public shared (msg) func addData(presionBarometrica: Text, temperatura: Text, humedad: Text) : async () {
    Debug.print("Ingresar Presión Barométrica: " # presionBarometrica);
    Debug.print("Ingresar Temperatura: " # temperatura);
    Debug.print("Ingresar Humedad: " # humedad);
    let dataEntry = {
      id = generaEntryID();
      presionBarometrica = presionBarometrica;
      temperatura = temperatura;
      humedad = humedad;
    };

    listaDatos.put(Nat32.toText(dataEntry.id), dataEntry);
    Debug.print("Nuevo dato registrado ID: " # Nat32.toText(dataEntry.id));
    return ();
  };

  public query func getDataEntries() : async [(Text, DataEntry)] {
    let dataIter : Iter.Iter<(Text, DataEntry)> = listaDatos.entries();
    let dataArray : [(Text, DataEntry)] = Iter.toArray(dataIter);
    Debug.print("Datos registrados");

    return dataArray;
  };

  public query func getDataEntryById(id: Text) : async ?DataEntry {
    let dataEntry: ?DataEntry = listaDatos.get(id);
    return dataEntry;
  };

  public shared (msg) func updateDataEntry(id: Text, presionBarometrica: Text, temperatura: Text, humedad: Text) : async Bool {
    let dataEntry: ?DataEntry = listaDatos.get(id);

    switch (dataEntry) {
      case (null) {
        return false;
      };
      case (?entryActual) {
        Debug.print("Actualizar Presión Barométrica: " # presionBarometrica);
        Debug.print("Actualizar Temperatura: " # temperatura);
        Debug.print("Actualizar Humedad: " # humedad);
        let updatedDataEntry: DataEntry = {
          id = entryActual.id;
          presionBarometrica = presionBarometrica;
          temperatura = temperatura;
          humedad = humedad;
        };
        listaDatos.put(id, updatedDataEntry);
        Debug.print("Dato actualizado: " # id);
        return true;
      };
    };

  };

  public shared (msg) func deleteDataEntryById(id: Text) : async Bool {
    let dataEntry: ?DataEntry = listaDatos.get(id);
    switch (dataEntry) {
      case (null) {
        return false;
      };
      case (_) {
        ignore listaDatos.remove(id);
        Debug.print("Dato eliminado: " # id);
        return true;
      };
    };
  };
};
