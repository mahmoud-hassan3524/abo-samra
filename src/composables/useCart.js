import { ref, computed, watch } from 'vue'
import confetti from 'canvas-confetti'
import { restaurantInfo } from '../data/restaurantInfo'

// Global cart state (singleton across components)
const cartItems = ref([])
const isCartOpen = ref(false)
const orderType = ref('delivery') // 'delivery' | 'pickup' | 'dinein'
const deliveryFee = ref(15) // EGP
const discountCode = ref('')
const discountAmount = ref(0)
const discountSuccessMessage = ref('')
const discountErrorMessage = ref('')

const customer = ref({
  name: '',
  phone: '',
  address: '',
  notes: ''
})

// Load from localStorage if present
try {
  const savedCart = localStorage.getItem('abu_samra_cart')
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart)
  }
} catch (e) {
  console.warn('Could not read cart from localStorage', e)
}

// Watch and sync with localStorage
watch(cartItems, (newVal) => {
  try {
    localStorage.setItem('abu_samra_cart', JSON.stringify(newVal))
  } catch (e) {
    console.warn('Could not save cart to localStorage', e)
  }
}, { deep: true })

export function useCart() {
  const openCart = () => { isCartOpen.value = true }
  const closeCart = () => { isCartOpen.value = false }
  const toggleCart = () => { isCartOpen.value = !isCartOpen.value }

  // Unique key for item variations (item id + extra cheese + spice level + notes)
  const getItemKey = (item, options = {}) => {
    return `${item.id}-${options.extraCheese ? 'cheese' : 'no-cheese'}-${options.spiceLevel || 'normal'}-${options.notes || ''}`
  }

  const addToCart = (product, options = {}) => {
    const extraCheese = !!options.extraCheese
    const cheesePrice = extraCheese ? 15 : 0 // As in menu: اي اضافة جبنة ب15جنيه
    const unitPrice = (product.price || 0) + cheesePrice
    const quantity = options.quantity || 1
    const spiceLevel = options.spiceLevel || 'normal'
    const notes = options.notes || ''
    const itemKey = getItemKey(product, { extraCheese, spiceLevel, notes })

    const existingIndex = cartItems.value.findIndex(i => i.key === itemKey)

    if (existingIndex > -1) {
      cartItems.value[existingIndex].quantity += quantity
    } else {
      cartItems.value.push({
        key: itemKey,
        product,
        quantity,
        extraCheese,
        spiceLevel,
        notes,
        unitPrice
      })
    }

    // Auto open drawer or show feedback
    isCartOpen.value = true
  }

  const updateQuantity = (key, delta) => {
    const index = cartItems.value.findIndex(i => i.key === key)
    if (index > -1) {
      const newQty = cartItems.value[index].quantity + delta
      if (newQty <= 0) {
        cartItems.value.splice(index, 1)
      } else {
        cartItems.value[index].quantity = newQty
      }
    }
  }

  const removeFromCart = (key) => {
    const index = cartItems.value.findIndex(i => i.key === key)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const clearCart = () => {
    cartItems.value = []
    discountCode.value = ''
    discountAmount.value = 0
    discountSuccessMessage.value = ''
    discountErrorMessage.value = ''
  }

  const applyCoupon = () => {
    const code = discountCode.value.trim().toUpperCase()
    discountErrorMessage.value = ''
    discountSuccessMessage.value = ''

    if (!code) return

    if (code === 'SAMRA10' || code === 'ABU10') {
      const discount = Math.round(subtotal.value * 0.10)
      discountAmount.value = discount
      discountSuccessMessage.value = `تم تطبيق خصم 10% (-${discount} ج.م)`
    } else if (code === 'WELCOME') {
      discountAmount.value = 20
      discountSuccessMessage.value = 'تم تطبيق خصم الترحيب (-20 ج.م)'
    } else {
      discountErrorMessage.value = 'كود الخصم غير صالح أو منتهي الصلاحية'
      discountAmount.value = 0
    }
  }

  const removeCoupon = () => {
    discountCode.value = ''
    discountAmount.value = 0
    discountSuccessMessage.value = ''
    discountErrorMessage.value = ''
  }

  const itemsCount = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0)
  })

  const currentDeliveryFee = computed(() => {
    return orderType.value === 'delivery' ? deliveryFee.value : 0
  })

  const grandTotal = computed(() => {
    const total = subtotal.value - discountAmount.value + currentDeliveryFee.value
    return Math.max(0, total)
  })

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#f97316', '#f59e0b', '#22c55e']
      })
    } catch (e) {
      // fallback
    }
  }

  // Generates WhatsApp message link
  const generateWhatsAppOrderLink = () => {
    if (cartItems.value.length === 0) return '#'

    const orderTypeLabel = orderType.value === 'delivery' 
      ? '🛵 دليفري وتوصيل' 
      : (orderType.value === 'pickup' ? '🛍️ استلام من الفرع' : '🍽️ صالة داخلية')

    let text = `*طلب جديد من مطعم أبو سمرة*\n`
    text += `━━━━━━━━━━━━━━━━━━━━━\n`
    text += `*نوع الطلب:* ${orderTypeLabel}\n\n`
    text += `*تفاصيل الوجبات والطلبات:*\n`

    cartItems.value.forEach((item, idx) => {
      text += `${idx + 1}. *${item.product.name}* × ${item.quantity} = ${item.unitPrice * item.quantity} ج.م\n`
      if (item.extraCheese) text += `   🧀 إضافة جبنة موتزاريلا (+15 ج.م)\n`
      if (item.spiceLevel === 'spicy') text += `   🌶️ حار / سبايسي\n`
      if (item.notes) text += `   📝 ملاحظة: ${item.notes}\n`
    })

    text += `━━━━━━━━━━━━━━━━━━━━━\n`
    text += `*المجموع الفرعي:* ${subtotal.value} ج.م\n`
    if (orderType.value === 'delivery') {
      text += `*خدمة التوصيل:* ${deliveryFee.value} ج.م\n`
    }
    if (discountAmount.value > 0) {
      text += `*الخصم (${discountCode.value}):* -${discountAmount.value} ج.م\n`
    }
    text += `*الإجمالي النهائي:* ${grandTotal.value} ج.م\n`
    text += `━━━━━━━━━━━━━━━━━━━━━\n`
    
    if (customer.value.name) text += `👤 *الاسم:* ${customer.value.name}\n`
    if (customer.value.phone) text += `📱 *رقم الهاتف:* ${customer.value.phone}\n`
    if (orderType.value === 'delivery' && customer.value.address) {
      text += `📍 *العنوان:* ${customer.value.address}\n`
    }
    if (customer.value.notes) text += `💬 *ملاحظات خاصة:* ${customer.value.notes}\n`

    text += `\nشكراً لكم مطعم أبو سمرة! في انتظار التأكيد.`

    const encoded = encodeURIComponent(text)
    return `https://wa.me/201157707019?text=${encoded}`
  }

  return {
    cartItems,
    isCartOpen,
    orderType,
    deliveryFee,
    discountCode,
    discountAmount,
    discountSuccessMessage,
    discountErrorMessage,
    customer,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    itemsCount,
    subtotal,
    currentDeliveryFee,
    grandTotal,
    triggerCelebration,
    generateWhatsAppOrderLink
  }
}
