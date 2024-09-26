<script lang="ts" setup>
import { Loader2 } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

import { useAbilityQuery } from '@/app/composables/ability'
import { useMovementQuery } from '@/app/composables/movement'
import { usePokemonDetailQuery } from '@/app/composables/pokemon'
import { useDamageRelationsQuery, useTypeQuery } from '@/app/composables/type'

const isAlertVisible = ref(false)

const { isLoadingPokemonDetail, isSuccessPokemonDetail } = usePokemonDetailQuery()
const { isLoadingMovement, isSuccessMovement } = useMovementQuery()
const { isLoadingDamageRelations, isSuccessDamageRelations } = useDamageRelationsQuery()
const { isLoadingType, isSuccessType } = useTypeQuery()

const { isLoadingAbility, isSuccessAbility } = useAbilityQuery()

const areSomeLoading = computed(
  () =>
    isLoadingPokemonDetail.value ||
    isLoadingMovement.value ||
    isLoadingDamageRelations.value ||
    isLoadingType.value ||
    isLoadingAbility.value
)

const isSuccessAll = computed(
  () =>
    isSuccessPokemonDetail.value &&
    isSuccessMovement.value &&
    isSuccessDamageRelations.value &&
    isSuccessType.value &&
    isSuccessAbility.value
)

watch(isSuccessAll, (value) => {
  if (value) {
    setTimeout(() => {
      isAlertVisible.value = false
    }, 5000)
  }
})

watch(areSomeLoading, (value) => {
  if (value) {
    isAlertVisible.value = true
  }
})
</script>

<template>
  <div>
    <div v-if="areSomeLoading" class="flex flex-col space-y-1">
      <div class="flex h-[40px] w-full items-center justify-center gap-2 rounded-xl">
        <Loader2 class="size-3 animate-spin" />
        <span class="text-xs">Guardando en cache...</span>
      </div>
    </div>
    <div v-if="isSuccessAll && isAlertVisible">
      <p class="text-xs text-green-500">Datos guardados en cache</p>
    </div>
  </div>
</template>
