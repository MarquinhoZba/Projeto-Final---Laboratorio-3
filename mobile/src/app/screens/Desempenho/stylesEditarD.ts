import { StyleSheet } from 'react-native';

export const stylesEditarD = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },

  desempenhoContainer: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 25,
  },

  formGroup: {
    marginBottom: 18,
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#444',
    fontSize: 15,
  },

  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    fontSize: 15,
  },

  formAcoes: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 25,
  },

  btnSalvar: {
    flex: 1,
    backgroundColor: '#299b63',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  btnVoltar: {
    flex: 1,
    backgroundColor: '#bdc3c7',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  btnVoltarText: {
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: 15,
  },

  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },

});