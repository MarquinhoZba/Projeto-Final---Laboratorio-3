import { StyleSheet } from "react-native";

export const stylesLog = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#f5f0ff' },

  blob: { position: 'absolute', borderRadius: 1000, opacity: 0.45 },
  blob1: { width: 300, height: 300, backgroundColor: '#9FE1CB', top: -50, left: -50 },
  blob2: { width: 250, height: 250, backgroundColor: '#CECBF6', bottom: -30, right: -30 },
  blob3: { width: 180, height: 180, backgroundColor: '#B5D4F4', top: '40%', left: -20 },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingBottom: 30,
  },

  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 24,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    elevation: 5,
  },

  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: { fontSize: 24, fontWeight: '700', color: '#0F2D1F', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#5A7D6C', marginBottom: 25 },

  inputGroup: { marginBottom: 18 },
  label: { fontSize: 12, fontWeight: '600', color: '#3B6D50', marginBottom: 8, letterSpacing: 1 },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: '#C0DCC8',
    borderRadius: 12,
    height: 50,
  },

  fieldIcon: { marginLeft: 15 },
  input: { flex: 1, paddingHorizontal: 15, color: '#1a2e25', fontSize: 14 },
  eyeBtn: { padding: 10, marginRight: 5 },

  esqueceu: { alignSelf: 'flex-end', marginBottom: 25 },
  esqueceuText: { color: '#1D9E75', fontSize: 13, fontWeight: '500' },

  btn: { height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  btnText: { color: 'white', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
});