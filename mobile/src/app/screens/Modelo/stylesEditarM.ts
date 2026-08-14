import { StyleSheet } from 'react-native';

export const stylesEditarM = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5ee',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  /* BLOBS */
  blob: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.45,
  },

  blob1: {
    width: 300,
    height: 300,
    backgroundColor: '#9FE1CB',
    top: -80,
    left: -60,
  },

  blob2: {
    width: 250,
    height: 250,
    backgroundColor: '#CECBF6',
    bottom: -60,
    right: -40,
  },

  /* CARD */
  glassContainer: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  /* ÍCONE */
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    alignSelf: 'center',
  },

  /* TEXTOS */
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F2D1F',
    textAlign: 'center',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 13,
    color: '#5A7D6C',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 20,
  },

  /* INPUTS */
  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3B6D50',
    marginBottom: 8,
    letterSpacing: 1,
  },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CFE7D7',
    minHeight: 52,
    paddingHorizontal: 16,
  },

  fieldIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: '#1a2e25',
    paddingVertical: 14,
  },

  /* BOTÃO SALVAR */
  btn: {
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },

  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  /* BOTÃO VOLTAR */
  btnVoltar: {
    marginTop: 16,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0DCC8',
    backgroundColor: 'rgba(255,255,255,0.55)',
  },

  btnVoltarText: {
    color: '#3B6D50',
    fontSize: 14,
    fontWeight: '600',
  },
});