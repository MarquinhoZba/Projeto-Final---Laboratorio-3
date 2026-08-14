import { StyleSheet } from 'react-native';

export const stylesRegM = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBF8',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 22,
  },

  blob: {
    position: 'absolute',
    borderRadius: 300,
    opacity: 0.18,
  },

  blob1: {
    width: 220,
    height: 220,
    backgroundColor: '#9FE1CB',
    top: -60,
    left: -70,
  },

  blob2: {
    width: 180,
    height: 180,
    backgroundColor: '#CECBF6',
    bottom: 0,
    right: -50,
  },

  glassContainer: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 30,
    padding: 25,
    borderWidth: 1,
    borderColor: '#E4F2EB',
    elevation: 6,
  },

  iconWrap: {
    width: 65,
    height: 65,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F2D1F',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7B74',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 30,
    lineHeight: 22,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3B6D50',
    marginBottom: 8,
  },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAF8',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DCEEE6',
    paddingHorizontal: 15,
  },

  fieldIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A2E25',
    paddingVertical: 16,
  },

  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  btn: {
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 15,
  },

  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  btnVoltar: {
    marginTop: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#C0DCC8',
    paddingVertical: 16,
    alignItems: 'center',
  },

  btnVoltarText: {
    color: '#3B6D50',
    fontWeight: '600',
    fontSize: 15,
  },
});